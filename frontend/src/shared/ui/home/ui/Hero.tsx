const blocks: Array<{ title: string, value: string, explanation: string, comment?: string, income?: boolean }> = [{
    title: "Ставка инфляции (базовая)",
    value: "7.5%",
    explanation: "Ориентир ЦБ",
    income: true,
    comment: "Минимальный порог доходности для сбережений"
}, {
    title: "Ставка инфляции (базовая)",
    value: "7.5%",
    explanation: "Ориентир ЦБ",
    income: false,
    comment: "Минимальный порог доходности для сбережений"
},
{
    title: "Ставка инфляции (базовая)",
    value: "7.5%",
    explanation: "Ориентир ЦБ",
    income: false,
    comment: "Минимальный порог доходности для сбережений"
},
{
    title: "Ставка инфляции (базовая)",
    value: "7.5%",
    explanation: "Ориентир ЦБ",
    income: false,
    comment: "Минимальный порог доходности для сбережений"
},
{
    title: "Ставка инфляции (базовая)",
    value: "7.5%",
    explanation: "Ориентир ЦБ",
    income: false,
    comment: "Минимальный порог доходности для сбережений"
},]

export default function Hero() {
    return (
        <section>
            <div>
                <div>
                    <h2>простой финансовый инструмент</h2>
                    <h1>Управляйте личными финансами и планируйте накопления</h1>
                    <p>Минималистичный сервис для учета бюджета, расчета сложных процентов и изучения базы знаний по финансовой грамотности</p>
                    <div>
                        <div>
                            <button>Открыть калькулятор </button>
                            <button>Читать статьи</button>
                        </div>
                        <p>Формулы стандарта МСФО / ЦБ РФ</p>
                    </div>
                </div>
                <div>
                    Calculator
                </div>
            </div>
            <div>
                <ul className="flex gap-4">
                    {
                        blocks.map(block => {
                            return <li className="bg-gray-100 rounded-xl px-4 py-2 shadow-md">
                                <dl className="flex flex-col gap-2">
                                    <dt className="text-gray-600 uppercase font-text font-bold text-sm">{block.title}</dt>
                                    <div className="flex justify-between items-center">
                                        <dd className={`font-text text-xl font-bold ${block.income && "text-accent"}`}>{block.value}</dd>
                                        {block.comment && <div className="text-sm text-right font-text text-gray-600 ">{block.comment}</div>}
                                    </div>
                                </dl>
                                <p>{block.explanation}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </section>
    )
}