import { useEffect } from "react";
import logo from "../assets/amethyst.png";
import { siteConfig } from "../config";

const { getCurrentWindow, app } = window.require("@electron/remote");

export function Titlebar() {
	const currentWindow = getCurrentWindow();

	useEffect(() => {
		const icon = document.getElementById("icon") as HTMLElement;
		icon.ondragstart = () => false;
	});

	return (
		<div className="title-bar max-h-[32px] py-1 flex items-center border-b border-muted-foreground/10 sticky top-0 select-none">
			<div className="menu-button-container">
				<img
					id="icon"
					src={logo}
					className="menu-icon select-none"
					alt="amethyst"
				/>
				{siteConfig.name}
			</div>
			<div className="window-controls-container">
				<button className="button" onClick={() => currentWindow.minimize()}>
					🗕
				</button>
				<button
					title="Maximize"
					className="button"
					onClick={() => {
						if (currentWindow.isMaximized()) {
							currentWindow.unmaximize();
						} else {
							currentWindow.maximize();
						}
					}}
				>
					🗖
				</button>
				<button title="Close" className="button" onClick={() => app.quit()}>
					✖
				</button>
			</div>
		</div>
	);
}
