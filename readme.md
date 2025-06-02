# Dots & Boxes Game

A modern, responsive web-based implementation of the classic Dots and Boxes game with a beautiful glassmorphism design and smooth animations.

## 🎮 Game Features

- **Multiple Board Sizes**: Choose from 3×3 (Small), 5×5 (Medium), 8×8 (Large), or create custom dimensions up to 20×20
- **Two Game Modes**: 
  - Player vs Player (local multiplayer)
  - Player vs Computer (with intelligent AI)
- **Custom Player Names**: Personalize your gaming experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations and visual effects
- **Real-time Scoring**: Live score tracking with turn indicators
- **Game Statistics**: Post-game leaderboard showing final results

## 🎯 How to Play

1. **Setup**: Enter player names and select your preferred board size and game mode
2. **Gameplay**: Click on the dashed lines between dots to draw them
3. **Scoring**: Complete a box (all 4 sides) to claim it and earn a point
4. **Bonus Turns**: Completing a box grants you an additional turn
5. **Victory**: The player with the most completed boxes wins!

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/r3dhulk/dots-and-boxes.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dots-and-boxes
   ```
3. Open `index.html` in your web browser

### Direct Play
Simply download the `index.html` file and open it in any modern web browser - no server setup required!

## 🎨 Design Features

- **Glassmorphism UI**: Modern frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Hover effects and transitions for better UX
- **Responsive Layout**: Adapts to all screen sizes
- **Visual Feedback**: Clear indicators for player turns and completed boxes
- **Accessibility**: High contrast and touch-friendly interface

## 🤖 AI Strategy

The computer opponent uses an intelligent strategy:
1. **Offensive Play**: Prioritizes completing boxes when possible
2. **Defensive Play**: Avoids moves that would give the opponent easy box completions
3. **Random Fallback**: Makes random safe moves when no strategic advantage is clear

## 📱 Mobile Support

- Touch-optimized interface
- Responsive grid scaling
- Finger-friendly touch targets
- Optimized font sizes and spacing
- Landscape and portrait orientation support

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript**: No external dependencies
- **ES6 Classes**: Modern JavaScript architecture
- **CSS Grid & Flexbox**: Responsive layout system
- **CSS Custom Properties**: Easy theming and customization
- **Event-driven Architecture**: Clean separation of game logic and UI

## 🎯 Game Rules

1. Players take turns drawing lines between adjacent dots
2. When a player completes the fourth side of a square, they:
   - Claim that box (marked with their initial)
   - Earn one point
   - Get another turn immediately
3. The game ends when all possible lines are drawn
4. The player with the most completed boxes wins

## 🔧 Customization

The game supports various customization options:
- **Board Size**: From 2×2 up to 20×20 grids
- **Player Names**: Custom names for personalized experience
- **Visual Themes**: Easy to modify CSS variables for different color schemes

## 📈 Future Enhancements

- [ ] Online multiplayer support
- [ ] AI difficulty levels
- [ ] Game replay system
- [ ] Sound effects and music
- [ ] Tournament mode
- [ ] Statistics tracking
- [ ] Theme customization
- [ ] Undo/Redo functionality

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎪 Demo

[Play the game online here](https://r3dhulk.github.io/dots-and-boxes)

## 💡 Tips & Strategies

- **Early Game**: Focus on the center of the board
- **Mid Game**: Watch for chain reactions where completing one box leads to many more
- **End Game**: Count carefully and look for sacrifice moves
- **Against AI**: The computer is aggressive about completing boxes, so set up defensive positions

## 🐛 Known Issues

- None currently reported. Please [open an issue](https://github.com/r3dhulk/dots-and-boxes/issues) if you find any bugs.

## ⭐ Support

If you enjoy this game, please consider:
- Starring the repository
- Sharing it with friends
- Contributing improvements
- Reporting bugs or suggesting features

---

*Made with ❤️ for classic game enthusiasts*