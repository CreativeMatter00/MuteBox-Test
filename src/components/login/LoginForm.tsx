"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SyncLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Cookies from "js-cookie";
import parseRoleFromToken from "@/helpers/jwtHelper";

interface ILoginInput {
	email: string;
	password: string;
}

export function LoginForm() {
	const [isLoading, setIsLoading] = useState<boolean>();
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const router = useRouter();

	const token = Cookies.get("token");

	console.log("token", token);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginInput>();

	const onSubmit = (data: ILoginInput) => {
		setIsLoading(true);
		fetch(`/api/login`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (data.success === true) {
					const token = data.token;
					const role = parseRoleFromToken(token);

					// Redirect based on the role
					switch (role) {
						case "admin":
							router.push("/admin");
							break;
						case "user":
							router.push("/opinion");
							break;
						default:
							// Redirect to a default page if role is neither admin nor user
							router.push("/login");
							break;
					}
				} else {
					toast.error(data.error, {
						position: "top-left",
						autoClose: 3001,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<BackgroundGradient className="rounded-[22px] max-lg:w-full sm:p-10 bg-white dark:bg-zinc-900">
			<div className=" w-full mx-auto rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
				<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 uppercase">
					Login Here
				</h2>

				<form className="my-8 w-full" onSubmit={handleSubmit(onSubmit)}>
					<LabelInputContainer className="mb-4">
						<Label htmlFor="userName">User Email*</Label>
						<Input
							id="text"
							placeholder="Enter your email address"
							type="text"
							{...register("email", {
								required: true,
								pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							})}
						/>
						{errors?.email?.type === "required" && (
							<span className="text-xs text-red-700">
								Please provide a Email
							</span>
						)}

						{errors?.email?.type === "pattern" && (
							<span className="text-xs text-red-700">
								Invalid email address
							</span>
						)}
					</LabelInputContainer>

					<LabelInputContainer className="mb-4">
						<Label htmlFor="password">Password*</Label>
						<div className="relative">
							<Input
								id="password"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								className="pr-8"
								{...register("password", {
									required: true,
									minLength: 5,
								})}
							/>
							{errors?.password?.type === "required" && (
								<span className="text-xs text-red-700">
									Please provide a Password
								</span>
							)}

							{errors?.password?.type === "minLength" && (
								<p className="text-xs text-red-700">
									Password must be at least 5 characters long
								</p>
							)}

							<button
								type="button"
								className="absolute top-1/2 right-3 transform -translate-y-1/2"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? (
									<IoMdEyeOff className="h-5 w-5 text-gray-400" />
								) : (
									<IoMdEye className="h-5 w-5 text-gray-400" />
								)}
							</button>
						</div>
					</LabelInputContainer>

					<button
						className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
						type="submit"
					>
						{isLoading ? (
							<SyncLoader color="#FFFFFF" size={8} />
						) : (
							<div>Login &rarr;</div>
						)}

						<BottomGradient />
					</button>
					<ToastContainer />
				</form>
			</div>
		</BackgroundGradient>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
