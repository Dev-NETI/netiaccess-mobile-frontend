const Card = ({ title, description, children }) => (
    <>

        <a href="#" className="block max-w-sm h-24 max-h-24 p-6 bg-gradient-to-r from-cyan-400 to-cyan-700 border border-cyan-400 rounded-lg shadow 
        hover:bg-gradient-to-r hover:from-cyan-700 hover:to-cyan-900
        dark:bg-gray-800 dark:border-gray-700
         dark:hover:bg-gray-700 ml-2 mr-2">

            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-100 dark:text-white">
                {title}
            </h5>
            <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
                {description}
            </p>
            {children}
        </a>

    </>
)

export default Card;