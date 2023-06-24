import { Turnstile } from "./Turnstile";

type SignUpFormProps = {
	code: string;
};

export function SignUpForm({ code }: SignUpFormProps) {
	return (
		<div className="p-4 bg-white rounded-2xl">
			<form className="flex flex-col" action="/email" method="POST">
				<div className="flex flex-col px-2 border-b">
					<h2 className="mb-1 font-semibold text-center text-2xl">Join waitlist</h2>
					<span className="mb-6 text-center text-xs text-slate-600">and be the first to receive new exclusive updates!</span>
				</div>
				<div className="px-2">
					<div className="flex flex-col" style={{ width: '300px' }}>
						<label htmlFor="email" className="mt-6 mb-1 text-sm px-2">Email</label>
						<input required className="h-10 border p-2 mb-4 rounded-lg text-sm" type="email" id="email" name="email" placeholder="Enter your email" />
						<div className="flex w-full justify-center mb-4" style={{ height: '60px' }}>
							<Turnstile siteKey="0x4AAAAAAAGe7L2vRCTnleMg" />
						</div>
						<input className="p-2 bg-blue-500 rounded-lg cursor-pointer text-white" type="submit" value="Join" />
					</div>
				</div>
				<input hidden name="code" value={code} />
			</form>
		</div>
	);
}