import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { prisma } from "..";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "PasswordIsPassword";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Checking if the required data came from the body
    if (!username || !email || !password) {
      res.status(400).json({
        status: false,
        message: "Username, Email, and Password are required.",
      });
      return;
    }

    // Zod validation schema for signup body data
    const zodValidation = z.object({
      username: z
        .string()
        .max(12, { message: "Username must be at most 12 characters long." })
        .min(3, { message: "Username must be at least 3 characters long." }),
      email: z.string().email({ message: "Invalid email address format." }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .max(16, { message: "Password must be at most 16 characters long." })
        .regex(
          /^\S*(?=\S{8,16})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
          {
            message:
              "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character.",
          }
        ),
    });

    // Validating the data using Zod
    const validationResult = zodValidation.safeParse({
      username,
      password,
      email,
    });
    if (!validationResult.success) {
      res.status(400).json({
        status: false,
        message: "Validation failed.",
        errors: validationResult.error.errors,
      });
      return;
    }

    // Checking if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({
        status: false,
        message:
          "User with this email already exists. Please use a different email.",
      });
      return;
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Createing the user in the database
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword, email },
    });

    // Generateing JWT Token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Responding with the success message and the JWT token
    res.status(201).json({
      status: true,
      message: "User successfully registered. Please log in.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Checking if the required data came from the body
    if (!email || !password) {
      res.status(400).json({
        status: false,
        message: "Email and Password are required.",
      });
      return;
    }

    // Zod validation schema for signin body data
    const zodValidation = z.object({
      email: z.string().email({ message: "Invalid email address format." }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
    });

    // Validating the data using Zod
    const validationResult = zodValidation.safeParse({ email, password });
    if (!validationResult.success) {
      res.status(400).json({
        status: false,
        message: "Validation failed.",
        errors: validationResult.error.errors,
      });
      return;
    }

    // Checking if the user exists in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({
        status: false,
        message: "User not found. Please check your email and try again.",
      });
      return;
    }

    // Password comparings
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({
        status: false,
        message: "Incorrect password. Please try again.",
      });
      return;
    }

    // Generated a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Sending the response with the token
    res.status(200).json({
      status: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
