const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block text-sm `}
        {...props}>
        {children}
    </label>
)

export default Label
