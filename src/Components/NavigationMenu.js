import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const NavigationMenu = ({ navigate, userName, itemMenu, setItemMenu }) => {

    const handleChange = (event, newValue) => {
        userName !== '' ? setItemMenu(newValue) : setItemMenu(0);
    };

    return (
        <Box sx={{ width: '100%' }} style={{ marginBottom: '10px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={itemMenu} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Home" onClick={() => navigate('/')} />
                    <Tab label="Chat" onClick={() => navigate('/Chat')} disabled={userName === '' ? true : false} />
                    <Tab label="Upload Post" onClick={() => navigate('/UploaPost')} disabled={userName === '' ? true : false} />
                </Tabs>
            </Box>

        </Box>
    );
}

export default NavigationMenu;