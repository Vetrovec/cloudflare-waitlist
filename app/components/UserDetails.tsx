import Image from 'next/image';

const referralUrl = process.env.REFERRAL_URL as string;

type UserDetailsProps = {
	email: string;
	code: string;
	createdAt: Date;
};

export function UserDetails({ email, code, createdAt }: UserDetailsProps) {
	const url = referralUrl.replace('{code}', code);
	return (
		<div className="relative p-6 bg-white rounded-2xl">
			<div
				className="absolute top-0 inset-x-1/2 flex justify-center items-center rounded-full bg-white"
				style={{ width: '80px', height: '80px', transform: 'translate(-50%, -50%)' }}
			>
				<Image width={72} height={72} src="/logo-small.png" alt="Logo" />
			</div>
			<div style={{ width: '300px' }}>
				<div className="pt-4">
					<h2 className="mb-2 font-semibold text-2xl text-center">You&apos;re on the waitlist!</h2>
					<div className="mb-1 font-semibold text-center text-slate-800 text-xs">{email}</div>
					<div className="mb-4 text-center text-slate-800 text-xs">
						joined the waitlist on <span className="font-semibold">{createdAt.toLocaleDateString()}</span>
					</div>
				</div>
				<div className="flex flex-col items-center px-2 py-4 border-t gap-4">
					<span className="text-xs">Refer your friends and earn rewards</span>
					<div className="relative w-full flex items-center">
						<input className="w-full h-10 border p-2 pr-8 rounded-lg bg-slate-100 text-sm" disabled value={url} />
						<button className="absolute right-2">
							<Image width={16} height={20} src="/icon-copy.svg" alt="Copy" />
						</button>
					</div>
					<span className="text-xs">or</span>
					<a className="relative flex w-fit h-10 items-center pl-10 pr-6 py-2 border rounded-lg" href="/">
						<div className="absolute left-4">
							<Image width={12} height={12} src="/icon-back.svg" alt="Back" />
						</div>
						<span className="text-slate-800 text-sm">Go back</span>
					</a>
				</div>
				<div className="flex flex-col items-center border-t pt-6 gap-2">
					<span className="text-slate-800 text-xs">Get in touch</span>
					<div className="flex gap-4">
						<a href="https://twitter.com/StepanVetrovec" target="_blank">
							<Image width={24} height={24} src="/icon-twitter.png" alt="Twitter" />
						</a>
						<a href="https://github.com/Vetrovec" target="_blank">
							<Image width={24} height={24} src="/icon-github.png" alt="Github" />
						</a>
						<a href="https://www.linkedin.com/in/stepanvetrovec/" target="_blank">
							<Image width={24} height={24} src="/icon-linkedin.png" alt="Linkedin" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}