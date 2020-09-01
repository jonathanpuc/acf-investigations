export default ({ field, form, meta, ...props }) => (
  <>
    <textarea {...field} {...props} />
    {form.touched[field.name] && form.errors[field.name] && (
      <div className="error">{form.errors[field.name]}</div>
    )}
  </>
);
