const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} block w-full rounded-full border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset 
        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} 
        {...props}
    />
)

export default Input
