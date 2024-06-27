import Badge from "./Badge";
const Card = ({ title, description, children }) => (
    <div className="flex flex-col gap-2 p-4 h-20  bg-white border border-slate-200 rounded-2xl shadow-xl 
        hover:bg-gradient-to-r hover:from-cyan-700 hover:to-cyan-900
        dark:bg-gray-800 dark:border-gray-700
         dark:hover:bg-gray-700 ml-2 mr-2">

        <div className="basis-full flex text-center ">
            <h5 className="basis-full text-sm font-bold dark:text-white">
                {title}
            </h5>
        </div>

        <div className="basis-full flex flex-row justify-between">
            <Badge message={description} className="bg-nykBlue text-slate-50 " />
        </div>

        {children}
    </div>
)

export default Card;