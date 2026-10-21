// Monochrome platform marks inherit the portfolio palette.
export default function PlatformIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    linkedin: "M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h4v12H3V9Zm6 0h4v1.7c.8-1.2 1.8-2 3.7-2 3.5 0 4.3 2.2 4.3 5.4V21h-4v-6.2c0-1.6-.3-2.8-1.9-2.8-1.8 0-2.1 1.4-2.1 3V21H9V9Z",
    x: "M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-7.4L5.3 22H2l8.3-9.5L1 2h6.5l4.4 6.7L18.9 2ZM17.8 20h1.7L6.4 4H4.6l13.2 16Z",
    facebook: "M14 22v-9h3l.5-4H14V6.5c0-1.2.4-2 2-2h2V1.1C17.4 1 16.2 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z",
    tiktok: "M15 2h3c.3 2.4 1.7 4 4 4.5V10a10 10 0 0 1-4-1.3V16a7 7 0 1 1-7-7v3.5a3.5 3.5 0 1 0 4 3.5V2Z",
    github: "M12 1a11 11 0 0 0-3.5 21.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.7-1.2-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.9 4.2 19 4.5 19 4.5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3c0 .3.2.6.8.5A11 11 0 0 0 12 1Z",
    pinterest: "M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-1.8.2-2.7l1.3-5.5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1 .5 1.9 1.5 1.9 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4-4.1-4-2.8 0-4.4 2.1-4.4 4.3 0 .9.3 1.8.7 2.3l-.3 1.2c-.1.2-.3.3-.5.2-1.2-.6-1.9-2.2-1.9-3.8 0-3.1 2.3-6 6.6-6 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.4-5.2 6.4-1 0-2-.6-2.4-1.2l-.7 2.6c-.2 1-.9 2-1.3 2.8A10 10 0 1 0 12 2Z",
    substack: "M3 2h18v2H3V2Zm0 5h18v2H3V7Zm0 5h18v10l-9-5-9 5V12Z",
  };
  return <svg className="platform-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
    {paths[name] ? <path d={paths[name]} /> : name === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.3" /></> : name === "youtube" ? <><rect x="1" y="4" width="22" height="16" rx="5" /><path d="m10 8 6 4-6 4Z" fill="var(--panel-icon-cutout, var(--bg))" /></> : name === "calendly" ? <><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 8a6 6 0 1 0 0 8" fill="none" stroke="currentColor" strokeWidth="2" /></> : <><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7" /><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" /></>}
  </svg>;
}
