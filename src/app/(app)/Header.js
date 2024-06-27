const Header = ({ title, className }) => {
    return (
        <header>
            <h2 className={`${className} font-bold text-2xl  leading-tight text-start`}>
                {title}
            </h2>
        </header>
    )
}

export default Header