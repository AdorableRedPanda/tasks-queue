import type * as React from 'react';

import { Box, Text } from 'ink';

interface Props {
	items: string[];
	title: string;
}

export const Column: React.FC<Props> = ({ items, title }) => (
	<Box flexDirection="column">
		<Box>
			<Text bold>{title}</Text>
		</Box>

		<Box flexDirection="column">
			{items.map((item) => (
				<Box key={item}>
					<Text>{item}</Text>
				</Box>
			))}
		</Box>
	</Box>
);
