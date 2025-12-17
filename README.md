# Focus Timer - Pomodoro Application

A feature-rich Pomodoro timer application with task management, statistics, and multimedia integration.

## 🎨 Two Versions Available

### Version 1 (index.html) - Main Branch
**Colorful & Feature-Rich Design**
- Gradient backgrounds and vibrant colors
- Traditional Pomodoro interface with badges
- Visible task columns on both sides
- Complete feature set

### Version 2 (index-v2.html) - Dev Branch
**Minimalist Dark Design** - Inspired by Focus by MDS
- Dark theme (black/white/gray palette)
- Modern Nunito Sans typography
- Clean card-based interface
- Elegant tab navigation
- Simplified settings overlay
- Same powerful features as v1

## 🚀 Features

### Timer & Modes
- **Pomodoro Mode**: Default 25-minute focus sessions
- **Short Break**: 5-minute breaks
- **Long Break**: 15-minute breaks
- Customizable durations for each mode
- Visual progress ring
- Session counter

### Task Management
- **Main Tasks**: Primary to-do list with time tracking
- **Subtasks**: Break down tasks into smaller steps
- **Time Tracking**: Automatic time logging per task
- **Task Selection**: Click to make a task active

### Statistics & Analytics
- Total sessions completed
- Total focus time
- Tasks completed/active count
- Time spent per task
- Session count per task
- Subtask completion rates

### Import/Export
- **Export Statistics to CSV**: Complete analytics data
- **Export Tasks to CSV**: Full task list with hierarchy
- **Import Tasks from CSV**: Load task lists from files

### Multimedia
- **YouTube Integration**: Play music/videos during sessions
- **Background Music**: Upload MP3 files with volume control
- **Custom Alarms**: Choose from bell, chime, or upload custom sounds
- **Alarm Volume Control**: Adjustable alarm volume
- **Music Fade-Out**: Auto fade during last 5 seconds

### Customization
- **Custom Background Images**: Personalize your workspace
- **YouTube Persistence**: Saves last YouTube URL
- **Local Storage**: All data persisted automatically

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/PhoenixWoodys/Johns_pomodoro.git
cd Johns_pomodoro
```

2. **To use Version 1 (colorful)**:
```bash
git checkout main
# Open index.html in your browser
```

3. **To test Version 2 (minimalist)**:
```bash
git checkout dev
# Open index-v2.html in your browser
```

## 🎯 Usage

### Basic Timer
1. Click "Start" to begin a Pomodoro session
2. Work until the timer completes
3. Take a break when prompted
4. Repeat!

### Managing Tasks
1. **Add Main Task**: Type in "Tasks" input and press Enter or click +
2. **Add Subtask**: Select a main task, then add subtasks
3. **Track Time**: Time is automatically tracked for the active task
4. **Complete Tasks**: Check the checkbox when done
5. **Delete Tasks**: Click the × button

### Exporting Data
1. Open Settings (⚙️)
2. Scroll to "Import / Export" section
3. Click "Export Statistics (CSV)" or "Export Tasks (CSV)"
4. Files will download automatically

### Importing Tasks
1. Prepare a CSV file in the export format
2. Open Settings → Import / Export
3. Click "Import Tasks (CSV)"
4. Select your file

## 🎨 Design Comparison

| Feature | Version 1 | Version 2 |
|---------|-----------|-----------|
| Theme | Colorful gradient | Dark minimalist |
| Typography | System fonts | Nunito Sans |
| Mode Selector | Top buttons | Integrated tabs |
| Settings | Side panel | Full overlay |
| Task Cards | Transparent | Solid dark cards |
| Visual Style | Glassmorphism | Flat modern |
| Inspiration | Original | Focus by MDS |

## 🛠️ Technology Stack

- **Pure HTML/CSS/JavaScript** - No frameworks required
- **YouTube IFrame API** - For video integration
- **Web Audio API** - For generated alarm sounds
- **LocalStorage API** - For data persistence
- **FileReader API** - For file uploads

## 📊 File Structure

```
Johns_Pomodoro/
├── index.html           # Version 1 (main)
├── index-v2.html        # Version 2 (dev)
├── alarm.mp3            # Default alarm sound
├── default_background.jpg # Default background image
└── README.md            # This file
```

## 🔄 Git Workflow

**Branches:**
- `main`: Stable version 1 (colorful design)
- `dev`: Version 2 testing (minimalist design)

**To contribute:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 CSV File Format

### Tasks Export Format
```csv
Type,ID,Text,Completed,Time Spent (min),Parent ID
Task,0,"Write documentation",1,50,
Subtask,1,"Create README",1,0,0
Subtask,2,"Add examples",0,0,0
```

### Statistics Export Format
```csv
Task,Total Time (min),Sessions,Completed,Subtasks Completed,Total Subtasks
"Write documentation",50,2,Yes,1,2

SUMMARY
Total Time,50,2,,1,1
```

## 🚀 Future Enhancements

- [ ] Dark/Light mode toggle for Version 1
- [ ] Merge best features from both versions
- [ ] Mobile app version
- [ ] Cloud sync option
- [ ] Browser notifications
- [ ] Keyboard shortcuts
- [ ] Themes marketplace

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- **Design Inspiration**: Focus by MDS Chrome Extension
- **Pomodoro Technique**: Francesco Cirillo
- **Typography**: Google Fonts (Nunito Sans)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using Claude Code**
