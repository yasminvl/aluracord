import { useRouter } from 'next/router'
import React from 'react';
import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';


export default function GitUserPage(data) {
    const [userData, setUserData] = React.useState({});
    let username = data.username
    React.useEffect(() => {
        getUserData();
    }, [username]);

    var gitHubUrl = `https://api.github.com/users/${username}`;

    const getUserData = async () => {
        const response = await fetch(gitHubUrl);
        const jsonData = await response.json();
        if (jsonData && jsonData.message !== "Not Found") {
            setUserData(jsonData);
        }
    };
    return (
        <>

            <Box styleSheet={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                <Box styleSheet={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Image
                        styleSheet={{
                            maxWidth: '70px',
                            borderRadius: '50%',
                            alignItems: 'center',

                        }}
                        src={`https://github.com/${userData.login + ".png"}`}
                    />
                    <Text

                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.primary[200],
                            padding: '10px 10px',
                            textAlign: 'center',
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        {userData.login}
                    </Text>

                </Box>
                <Box styleSheet={{ display: 'flex', flexDirection: 'column', margin: '15px' }}>


                    <Text variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[900],
                            textAlign: 'center',
                            padding: '10px 10px',
                            fontSize: "13px",
                            fontWeight: "bold",
                        }}>{userData.location}</Text>

                    <Text
                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[900],
                            textAlign: 'center',
                            fontSize: "11px",
                        }}
                    >

                        Followers: {userData.followers}


                    </Text>
                    <Text variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[900],
                            textAlign: 'center',
                            fontSize: "11px",
                        }}>Following: {userData.following}</Text>

                </Box>
            </Box>
        </>
    )
}