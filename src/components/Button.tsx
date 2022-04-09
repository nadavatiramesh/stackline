import React from 'react';

interface ButtonProps {
	buttonText: string,
	onClickHandler: (e: any) => void
}

const Button = (props: ButtonProps) => {
	const { buttonText = "", onClickHandler = () => {}} = props;
	return (
		<button onClick={onClickHandler}>{buttonText}</button>
	)
};

export default Button;