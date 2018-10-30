import React from 'react';
import './InputField.css';

export default class TextInputField extends React.Component {
  render() {
    const {
      label,
      name,
      _id,
      onChange,
      value,
      required,
      onBlur,
    } = this.props;
    return (
      <div className="input-field">
        <label
          className="input-field__label"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          uid ={_id}
          value={value}
          type="text"
          className="input-field__text-input"
          required={required}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
}

