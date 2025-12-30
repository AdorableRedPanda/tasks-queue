import type * as React from 'react';

import { Text } from 'ink';
import { useEffect, useState } from 'react';

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const INTERVAL = 80;

interface Props {
	active: boolean;
}

export const Loader: React.FC<Props> = ({ active }) => {
	const [frame, setFrame] = useState(0);
	const updateFrame = () => {
		setFrame((i) => (i + 1) % FRAMES.length);
	};

	useEffect(() => {
		const id = setInterval(updateFrame, INTERVAL);
		return () => clearInterval(id);
	}, []);

	if (!active) {
		return null;
	}

	return <Text color="green">{FRAMES[frame]} Loading...</Text>;
};
