"use client";

import { SparklesCore } from "../ui/sparkles";

export function SparklesPreview() {
	return (
		<div className="h-[60vh] w-full bg-white flex flex-col items-center justify-center overflow-hidden rounded-md">
			<h1 className="text-6xl lg:text-[12vh] leading-[16vh] font-bold text-center text-black relative z-20">
				Mute Box
			</h1>
			<div className="w-full h-[20vh] relative">
				{/* Gradients */}

				{/* <div className="absolute inset-x-[.2vh] top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-[.2vh] top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-[.2vh] top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-[.2vh] top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" /> */}
				<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
				<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
				<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
				<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

				<SparklesCore
					background="transparent"
					minSize={0.4}
					maxSize={1.5}
					particleDensity={1200}
					className="w-full h-full"
					particleColor="#000000"
				/>

				<div className="absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
			</div>
		</div>
	);
}
