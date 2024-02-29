import React from 'react';
import { Menu, MenuButton, MenuItem, MenuList, Button, MenuDivider } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function MenuDropdown({
    setIsExample
}) {
    return (
        <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme='blue'>
                Examples
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => setIsExample({
                    isExampleBool: true,
                    type: 'PHIM'
                })}>
                    PHIM
                </MenuItem>
                <MenuItem onClick={() => setIsExample({
                    isExampleBool: true,
                    type: 'Backing '
                })}>
                    Banking
                </MenuItem>
                {/*Will be uncoment once we need this*/}
                {/*   <MenuItem onClick={() => setIsExample({
                    isExampleBool: true,
                    type: 'let'
                })}>
                    Let
                </MenuItem>*/}
                <MenuDivider />
                <MenuItem onClick={() => setIsExample({
                    isExampleBool: false,
                    type: 'editor'
                })}>
                    My Editor
                </MenuItem>
            </MenuList>
        </Menu >
    );
}

export default MenuDropdown;