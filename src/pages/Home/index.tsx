/** @format */

export default function Home() {
	return (
		<div className=" mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
			<h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
				"Саманчынын жолу " аттуу китеп боюнча тест
			</h1>
			<div className="bg-white p-4 rounded-md mb-6">
				<p className="mb-2">
					Саламатсызбы окуучу,{" "}
					<span className="font-semibold">27-октябрда саат 13:00</span> Китеп
					боюнча экзамен болот.
				</p>
				<p className="mb-2">
					Экзаменге катышуу үчүн{" "}
					<span className="font-semibold text-red-600">25-октябрга чейин</span>{" "}
					ушул сайтка катталышыңыз керек.
				</p>
				<p className="bg-yellow-100 p-2 rounded-md text-yellow-800">
					<span className="font-bold">Эскертүү!</span> Эгерде катталбасаңыз
					тестке катыша албайсыз!
				</p>
			</div>

			<h2 className="text-2xl font-semibold mb-3 text-green-700">
				Тест кандай түрдө болот:
			</h2>
			<ul className="list-disc pl-6 mb-6 space-y-2">
				<li>
					Саат 13:00 дө баардык окуучу тестти баштоо керек. Кечиксе кайра
					тапшырганга болбойт.
				</li>
				<li>
					Бир суроого бир мүнөт убакыт берилет. Жооп бере албай калсаңыз, жооп
					туура эмес болуп саналат.
				</li>
				<li>
					Артка кайтып суроонун жообун өзгөртө албайсыз. Жооп берерден алдын
					жакшылап ойлонуп жооп бериңиз.
				</li>
				<li>
					Жыйынтык тест бүткөндөн кийин бир жарым сааттан кийин маалым болот.
				</li>
				<li>
					Мыктыны аныктоо үчүн биринчи туура жооп берген балына карайт, андан
					кийин бат жооп бергенине карайт.
				</li>
				<li>
					Эгерде бир орунга бир нече окуучу болуп калса, анда чүчү-кулак
					тартылат (жеребьевка).
				</li>
			</ul>

			<h3 className="text-xl font-semibold text-center text-purple-700">
				Тестти ийгиликтүү тапшырып алыңыз!
			</h3>

			<div className="mt-6 bg-blue-100 p-4 rounded-md">
				<p className="font-semibold text-blue-800">Даярдануу сунуштары:</p>
				<ul className="list-disc pl-6 mt-2 space-y-1 text-blue-700">
					<li>Китепти кайрадан окуп чыгыңыз</li>
					<li>Негизги окуяларды жана каармандарды эстеп калыңыз</li>
					<li>Тесттин форматына көнүү үчүн практикалык суроолорду чечиңиз</li>
					<li>Тест күнү жетиштүү уйку алып, жакшы тамактаныңыз</li>
				</ul>
			</div>
		</div>
	)
}
