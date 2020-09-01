export default ({ field, form, meta, ...props }) => (
  <label>
    <span>{props.label}</span>
    <input {...field} {...props} />
    {form.touched[field.name] && form.errors[field.name] && (
      <div className="error">{form.errors[field.name]}</div>
    )}
  </label>
);
