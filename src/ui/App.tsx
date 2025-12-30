import { Box, Text } from 'ink';

import { Column, Input } from './components';
import { useExecute, useProcessStop } from './hooks';

export const App = () => {
	useProcessStop();

	const { loading, logs, messages, startExecution } = useExecute();

	return (
		<Box flexDirection="column">
			<Input loading={loading} onSubmit={startExecution} />
			<Text>────────────────────────────</Text>
			<Box gap={3}>
				<Column items={messages} title="Messages" />
				<Column items={logs} title="Logs" />
			</Box>
		</Box>
	);
};
