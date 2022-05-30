import React, { useEffect, useState } from 'react';
import { CheckboxProps } from '.';
import { Icon } from '../Icon';
import { iconTypes } from '../Icon/collection';
import styles from './Checkbox.styles';

const { StyledInput, StyledLabel } = styles;

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    disabled = false,
    id,
    ref,
    label,
    labelWhenChecked,
    layout = 'box',
    name,
    onChange,
    onValidChange,
    onBlur,
    validation,
    ...props
}) => {
    const [isChecked, setIsChecked] = useState(Boolean(checked));

    const valueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (onValidChange && isValid(event)) {
            onValidChange(event);
        } else if (onValidChange && !isValid(event)) {
            return;
        } else if (onChange) {
            onChange(event);
        }

        setIsChecked(Boolean(event.target.checked));
    };

    const hasValidation = () => Boolean(validation?.required);

    const isValid = (
        event:
            | React.FocusEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLInputElement>,
    ): boolean => {
        // check if there exists validation rules
        if (!hasValidation()) return true;

        // check for HTML validation
        if (!event?.target.checkValidity()) return false;

        // if no errors were found, then return true
        return true;
    };

    useEffect(() => setIsChecked(Boolean(checked)), [checked]);

    return (
        <StyledLabel
            checked={isChecked}
            data-layout={layout}
            data-testid="test-checkbox-label"
            disabled={disabled}
            layout={layout}
        >
            {layout === 'box' && (
                <span className="after">
                    <Icon svg={iconTypes.check} fill="white" />
                </span>
            )}

            <StyledInput
                data-testid="test-checkbox-input"
                defaultChecked={isChecked}
                disabled={disabled}
                id={id}
                ref={ref}
                layout={layout}
                name={name}
                onChange={valueChanged}
                onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
                    onBlur && onBlur(event)
                }
                required={validation?.required}
                type="checkbox"
                value={`${isChecked}`}
                {...props}
            />
            <span data-testid="test-checkbox-text">
                {isChecked ? labelWhenChecked || label : label}
            </span>
        </StyledLabel>
    );
};

export default Checkbox;
