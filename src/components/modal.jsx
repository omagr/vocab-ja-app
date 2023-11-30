'use client';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	Flex,
	Text,
} from '@chakra-ui/react';
import Table from '@/components/table';
import React, { useEffect, useState } from 'react';

async function getData() {
	const res = await fetch("/api/notion");
	if (!res.ok) throw new Error('Failed to fetch data')
	return res.json()
}

function ModalBox({ isOpen, onClose }) {
	const [dict, setdict] = useState([])
	useEffect(() => {
		(async () => {
			try {
				const data = await getData();
				if (data.status != 200) return;
				setdict(data.data)
			} catch (err) {
				console.log('Error occured', err);
			}
		})();
	}, []);
	return (
		<>
			<Modal
				onClose={onClose}
				isOpen={isOpen}

				size='full'
				motionPreset='slideInBottom'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Om&apos;s Dictionary
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Table dict={dict} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export function MaterialSymbolsKeyboardDoubleArrowUpRounded(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='32px'
			height='32px'
			viewBox='0 0 24 24'
			{...props}>
			<path
				fill='currentColor'
				d='M6.7 11.7q-.275-.275-.275-.7t.275-.7l4.6-4.6q.15-.15.325-.212T12 5.425q.2 0 .375.063t.325.212l4.6 4.6q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275L12 7.825L8.1 11.7q-.275.275-.688.288T6.7 11.7Zm0 6q-.275-.275-.275-.7t.275-.7l4.6-4.6q.15-.15.325-.212t.375-.063q.2 0 .375.063t.325.212l4.6 4.6q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275L12 13.825L8.1 17.7q-.275.275-.688.288T6.7 17.7Z'></path>
		</svg>
	);
}

function VerticallyCenter() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Flex
				background='rgb(0 0 0 / 23%)'
				boxShadow='0 4px 30px rgb(10 10 10 / 24%)'
				backdropFilter='blur(10px)'
				position='absolute'
				bottom='20px'
				left='50%'
				w='95%'
				transform='translate(-50%, 0)'
				borderRadius={12}
				p={4}
				border='.5px solid #D1C3AE7A'
				color='#D1C3AE'
				justify='space-between'
				align='center'>
				<Text>Yours Dictionary 👉</Text>
				<Button
					color='#D1C3AE'
					onClick={onOpen}
					_hover={{
						bg: '#C29269',
						color: 'black',
					}}>
					<MaterialSymbolsKeyboardDoubleArrowUpRounded />
				</Button>
			</Flex>
			{isOpen && <ModalBox isOpen={isOpen} onClose={onClose} />}
		</>
	);
}
export default React.memo(VerticallyCenter)

