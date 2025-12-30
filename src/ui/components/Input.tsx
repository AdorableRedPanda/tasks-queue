import { Box, Text, useInput } from 'ink';
import { useState } from 'react';

import { Loader } from '@/ui/components/Loader';

interface Props {
	loading: boolean;
	onSubmit: (value: string) => void;
}

const placeholder = '<type your input here>';

const useInputState = ({ loading, onSubmit }: Props) => {
	const [value, setValue] = useState('');

	useInput((entry, key) => {
		if (loading) {
			return;
		}

		if (key.return) {
			onSubmit(value);
			return;
		}

		if (key.delete || key.backspace) {
			setValue((prev) => prev.slice(0, -1));
			return;
		}

		setValue((prev) => prev + entry);
	});

	return { value };
};

export const Input: React.FC<Props> = ({ loading, onSubmit }) => {
	const { value } = useInputState({ loading, onSubmit });

	return (
		<Box gap={1} marginLeft={1} marginRight={1}>
			<Text bold>Request input:</Text>
			<Text dimColor={!value} italic={!value}>
				{value || placeholder}
			</Text>
			<Loader active={loading} />
		</Box>
	);
};
