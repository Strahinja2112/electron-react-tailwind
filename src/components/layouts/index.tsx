import { ReactNode, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Titlebar } from "../title-bar";

const { ipcRenderer } = window.require("electron");

export interface ILayout {
	children: ReactNode;
	className?: string;
}

export function Layout({ children, className }: ILayout) {
	useEffect(() => {
		ipcRenderer.send("app_version");

		ipcRenderer.on("app_version", (event: any, arg: any) => {
			ipcRenderer.removeAllListeners("app_version");
			console.log(arg.version);
		});

		ipcRenderer.on("update_available", () => {
			ipcRenderer.removeAllListeners("update_available");
			console.log("update available, downloading...");
		});

		ipcRenderer.on("update_downloaded", () => {
			ipcRenderer.removeAllListeners("update_downloaded");
			console.log("update downloaded, restarting...");
			ipcRenderer.send("restart_app");
		});
	}, []);

	return (
		<>
			<Titlebar />
			<div
				className={cn(
					"select-none bg-background min-h-[calc(100vh-32px)] flex-1",
					className,
				)}
			>
				{children}
			</div>
		</>
	);
}

