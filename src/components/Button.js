const Button = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} block w-full text-slate-200 rounded-3xl px-3 py-3 text-center text-sm font-semibold shadow-sm bg-blue-900 `}
        {...props}
    />
)

export default Button
