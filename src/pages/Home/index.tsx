/** @format */

import Count from "../../components/Count"

export default function Home({ bgColor }: { bgColor: string }) {
	return (
		<div
			style={{ margin: "0 auto" }}
			className="text-3xl  font-bold  flex justify-center
items-center max-w-96 w-full h-[500px]  self-center  "
		>
			<Count bgColor={bgColor} />
		</div>
	)
}
