const keystrokesSounds = [
	new Audio("/sounds/1.mp3"),
	new Audio("/sounds/2.mp3"),
	new Audio("/sounds/3.mp3"),
	new Audio("/sounds/4.mp3"),
]


function useKeyBoardSounds() {
	const playRandomKeyStrokeSound = () => {
		const randomSounds = keystrokesSounds[Math.floor(Math.random() * keystrokesSounds.length)];
		randomSounds.currentTime = 0;
		randomSounds.play().catch((error) => console.log("Audio play failed :  ", error)
		)
	}
	return { playRandomKeyStrokeSound }
}

export default useKeyBoardSounds;