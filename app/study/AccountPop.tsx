import { Theme } from "@astryxdesign/core/theme";
import { Popover } from "@astryxdesign/core/Popover";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

import { ACCOUNT, lx, THEME } from "./store";
import "./astryx.css";

/**
 * Account menu (avatar button + popover), Astryx edition.
 *
 * Lives in its own lazy chunk: the chip only appears after /api/me resolves,
 * and StudyApp idle-prefetches this module alongside the Sheet, so the swap
 * is invisible. Astryx Popover supplies the anchored surface, its grow-from-
 * anchor motion, light dismiss and Escape handling — replacing the hand-rolled
 * .account-pop + full-screen mask button. Menu contents and classes are the
 * app's own (public/study.css .account-pop__*), sized to the old 228px pop.
 */
export function AccountMenu() {
	if (!ACCOUNT) return null;
	const initial = (ACCOUNT.name || ACCOUNT.email || "?").slice(0, 1).toUpperCase();
	return (
		<div className="account-wrap" id="accountMenu">
			<Theme theme={neutralTheme} mode={THEME === "dark" ? "dark" : "light"}>
				<div className="astryx-scope">
					<Popover
						placement="below"
						alignment="end"
						width={228}
						padding={3}
						role="none"
						hasAutoFocus={false}
						label={lx("账号", "Account")}
						content={
							<div role="menu">
								<div className="account-pop__name">{ACCOUNT.name || ACCOUNT.email}</div>
								{ACCOUNT.email ? <div className="account-pop__email">{ACCOUNT.email}</div> : null}
								<div className="account-pop__hint">
									{lx("收藏和错题已同步到此账号。", "Favorites and notes sync to this account.")}
								</div>
								<a className="account-pop__out" href="/auth/logout" role="menuitem">
									{lx("退出登录", "Sign out")}
								</a>
							</div>
						}
					>
						<button
							type="button"
							className="account-btn"
							id="accountBtn"
							aria-label={ACCOUNT.name || ACCOUNT.email || lx("账号", "Account")}
						>
							{ACCOUNT.picture ? <img src={ACCOUNT.picture} alt="" referrerPolicy="no-referrer" /> : <span>{initial}</span>}
						</button>
					</Popover>
				</div>
			</Theme>
		</div>
	);
}
