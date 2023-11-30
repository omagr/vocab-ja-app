'use client';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer, Badge
} from '@chakra-ui/react';

const Tag = ({ word }) => {
	return <Badge variant='solid' bg='#161515' color='#C29269' px="8px" py='4px' m='2px' borderRadius='8px' wordBreak='break-all'>{word}</Badge>
}

const TableCom = ({ dict }) => {
	return (
		<TableContainer>
			<Table variant='simple' size='lg'>
				<Thead>
					<Tr>
						<Th>Word</Th>
						<Th>definition</Th>
						<Th>example</Th>
						<Th>synonyms</Th>
						<Th>antonyms</Th>
					</Tr>
				</Thead>
				<Tbody>
					{dict ?
						dict.map((item, i) => (
							<Tr key={i}>
								<Td fontWeight='800' maxWidth='400px' whiteSpace='pre-wrap'>
									{item?.Word?.title[0]?.plain_text || ''}
								</Td>
								<Td fontStyle={'italic'} maxWidth='400px' whiteSpace='pre-wrap'>
									{item?.Definition?.rich_text[0]?.plain_text || ''}
								</Td>
								<Td maxWidth='400px' whiteSpace='pre-wrap'>
									{item?.Example?.rich_text[0]?.plain_text || ''}
								</Td>
								<Td maxWidth='400px' whiteSpace='pre-wrap'>

									{
										item?.Synonyms?.rich_text[0]?.plain_text.split(",").map((item, i) => <Tag key={i} word={item.trim() || ''} />)
									}
								</Td>
								<Td maxWidth='400px' whiteSpace='pre-wrap'>
									{
										item?.Antonyms?.rich_text[0]?.plain_text.split(",").map((item, i) => <Tag key={i} word={item.trim()} />)
									}
								</Td>
							</Tr>
						)) :
						<h1>No Dataset!</h1>
					}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default TableCom;
