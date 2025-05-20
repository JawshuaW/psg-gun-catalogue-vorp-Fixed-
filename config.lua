Config = {
    -- these map to a page in html/client.js
    -- make sure to set both if your modifying it
    weapons = {
        -- revolvers
        [1] = { ['weapon'] = 'WEAPON_REVOLVER_CATTLEMAN', ["price"] = 10, ['label'] = 'Cattleman Revolver', ['ammo'] = 'ammorevolvernormal', ['ammolabel'] = 'Revolver Ammo', ["ammoprice"] = 1},
        [2] = { ['weapon'] = 'WEAPON_REVOLVER_DOUBLEACTION', ["price"] = 20, ['label'] = 'Double-Action Revolver', ['ammo'] = 'ammorevolvernormal', ['ammolabel'] = 'Revolver Ammo', ["ammoprice"] = 1},
        [3] = { ['weapon'] = 'WEAPON_REVOLVER_LEMAT', ["price"] = 55, ['label'] = 'LeMat Revolver', ['ammo'] = 'ammorevolvernormal', ['ammolabel'] = 'Revolver Ammo', ["ammoprice"] = 1},
        [4] = { ['weapon'] = 'WEAPON_REVOLVER_SCHOFIELD', ["price"] = 30, ['label'] = 'Schofield Revolver', ['ammo'] = 'ammorevolvernormal', ['ammolabel'] = 'Revolver Ammo', ["ammoprice"] = 1},
        [5] = { ['weapon'] = 'WEAPON_PISTOL_VOLCANIC', ["price"] = 35, ['label'] = 'Volcanic Pistol', ['ammo'] = 'ammopistolnormal', ['ammolabel'] = 'Pistol Ammo', ["ammoprice"] = 1},
        [6] = { ['weapon'] = 'WEAPON_PISTOL_SEMIAUTO', ["price"] = 120, ['label'] = 'Semi-Auto Pistol', ['ammo'] = 'ammopistolnormal', ['ammolabel'] = 'Pistol Ammo', ["ammoprice"] = 1},
        [7] = { ['weapon'] = 'WEAPON_PISTOL_MAUSER', ["price"] = 100, ['label'] = 'Mauser Pistol', ['ammo'] = 'ammopistolnormal', ['ammolabel'] = 'Pistol Ammo', ["ammoprice"] = 1},
        -- repeaters
        [8] = { ['weapon'] = 'WEAPON_REPEATER_CARBINE', ["price"] = 45, ['label'] = 'Carbine Repeater', ['ammo'] = 'ammorepeaternormal', ['ammolabel'] = 'Repeater Ammo', ["ammoprice"] = 2},
        [9] = { ['weapon'] = 'WEAPON_REPEATER_WINCHESTER', ["price"] = 120, ['label'] = 'Winchester Repeater', ['ammo'] = 'ammorepeaternormal', ['ammolabel'] = 'Repeater Ammo', ["ammoprice"] = 2},
        [10] = { ['weapon'] = 'WEAPON_REPEATER_EVANS', ["price"] = 170, ['label'] = 'Evans Repeater', ['ammo'] = 'ammorepeaternormal', ['ammolabel'] = 'Repeater Ammo', ["ammoprice"] = 2},
        -- varmint
        [11] = { ['weapon'] = 'WEAPON_RIFLE_VARMINT', ["price"] = 35, ['label'] = 'Varmint Rifle', ['ammo'] = 'ammovarmint', ['ammolabel'] = 'Varmint Ammo', ["ammoprice"] = 1,},
        -- rifles
        [12] = { ['weapon'] = 'WEAPON_RIFLE_SPRINGFIELD', ["price"] = 265, ['label'] = 'Springfield Rifle', ['ammo'] = 'ammoriflenormal', ['ammolabel'] = 'Rifle Ammo', ["ammoprice"] = 2},
        [13] = { ['weapon'] = 'WEAPON_RIFLE_BOLTACTION', ["price"] = 275, ['label'] = 'Bolt-Action Rifle', ['ammo'] = 'ammoriflenormal', ['ammolabel'] = 'Rifle Ammo', ["ammoprice"] = 2},
        [14] = { ['weapon'] = 'WEAPON_SNIPERRIFLE_ROLLINGBLOCK', ["price"] = 290, ['label'] = 'Rolling Block Rifle', ['ammo'] = 'ammoriflenormal', ['ammolabel'] = 'Rifle Ammo', ["ammoprice"] = 2},
        [15] = { ['weapon'] = 'WEAPON_SNIPERRIFLE_CARCANO', ["price"] = 310, ['label'] = 'Carcano Rifle', ['ammo'] = 'ammoriflenormal', ['ammolabel'] = 'Rifle Ammo', ["ammoprice"] = 2},
        -- shotguns
        [16] = { ['weapon'] = 'WEAPON_SHOTGUN_SAWEDOFF', ["price"] = 140, ['label'] = 'Sawed-Off Shotgun', ['ammo'] = 'ammoshotgunnormal', ['ammolabel'] = 'Shotgun Ammo', ["ammoprice"] = 2},
        [17] = { ['weapon'] = 'WEAPON_SHOTGUN_DOUBLEBARREL', ["price"] = 65, ['label'] = 'Double-Barrel Shotgun', ['ammo'] = 'ammoshotgunnormal', ['ammolabel'] = 'Shotgun Ammo', ["ammoprice"] = 2},
        [18] = { ['weapon'] = 'WEAPON_SHOTGUN_PUMP', ["price"] = 80, ['label'] = 'Pump-Action Shotgun', ['ammo'] = 'ammoshotgunnormal', ['ammolabel'] = 'Shotgun Ammo', ["ammoprice"] = 2},
        [19] = { ['weapon'] = 'WEAPON_SHOTGUN_REPEATING', ["price"] = 170, ['label'] = 'Repeating Shotgun', ['ammo'] = 'ammoshotgunnormal', ['ammolabel'] = 'Shotgun Ammo', ["ammoprice"] = 2},
        [20] = { ['weapon'] = 'WEAPON_SHOTGUN_SEMIAUTO', ["price"] = 180, ['label'] = 'Semi-Auto Shotgun', ['ammo'] = 'ammoshotgunnormal', ['ammolabel'] = 'Shotgun Ammo', ["ammoprice"] = 2},
        -- misc
        [21] = { ['weapon'] = 'WEAPON_BOW', ["price"] = 35, ['label'] = 'Bow', ['ammo'] = 'ammoarrownormal', ['ammolabel'] = 'arrow', ["ammoprice"] = 1, ["AMMOCOUNT"] = 20 },
        [22] = { ['weapon'] = 'WEAPON_LASSO', ["price"] = 10, ['label'] = 'Lasso', ['ammo'] = 'none', ['ammolabel'] = 'none', ["ammoprice"] = 0},
        [23] = { ['weapon'] = 'WEAPON_FISHINGROD', ["price"] = 5, ['label'] = 'Fishing Rod', ['ammo'] = 'none', ['ammolabel'] = 'none', ["ammoprice"] = 0},
        [24] = { ['weapon'] = 'WEAPON_MELEE_LANTERN', ["price"] = 8, ['label'] = 'Lantern', ['ammo'] = 'none', ['ammolabel'] = 'none', ["ammoprice"] = 0},
        [25] = { ['weapon'] = 'WEAPON_MELEE_HATCHET', ["price"] = 10, ['label'] = 'Hatchet', ['ammo'] = 'none', ['ammolabel'] = 'none', ["ammoprice"] = 0},
        [26] = { ['weapon'] = 'WEAPON_MELEE_KNIFE', ["price"] = 7, ['label'] = 'Knife', ['ammo'] = 'none', ['ammolabel'] = 'none', ["ammoprice"] = 0},
        [27] = { ['weapon'] = 'WEAPON_THROWN_THROWING_KNIVES', ["price"] = 15, ['label'] = 'Throwing Knives', ['ammo'] = 'ammoknives', ['ammolabel'] = 'throwing knives', ["ammoprice"] = 5},
        [28] = { ['weapon'] = 'WEAPON_MELEE_MACHETE', ["price"] = 12, ['label'] = 'Machete', ['ammo'] = 'none', ['ammolabel'] = 'none', ["ammoprice"] = 0},
        [29] = { ['weapon'] = 'WEAPON_THROWN_TOMAHAWK', ["price"] = 20, ['label'] = 'Tomahawk', ['ammo'] = 'ammotomahawk', ['ammolabel'] = 'tomahawk', ["ammoprice"] = 5},
        [30] = { ['weapon'] = 'WEAPON_THROWN_DYNAMITE', ["price"] = 30, ['label'] = 'Dynamite', ['ammo'] = 'ammodynamite', ['ammolabel'] = 'dynamite', ["ammoprice"] = 10},
        [31] = { ['weapon'] = 'WEAPON_THROWN_MOLOTOV', ["price"] = 25, ['label'] = 'Molotov', ['ammo'] = 'ammomolotov', ['ammolabel'] = 'molotov', ["ammoprice"] = 8},
    },
    -- you can add new stores here
    storeConfig = {
        -- annesburg
        [1] = {
            location = { x = 2947.246, y = 1319.698, z = 44.88, h = 72.38 },
            storeClose = 20,
            storeOpen = 7,
        },
        -- saint denis
        [2] = {
            location = { x = 2716.972, y = -1286.010, z = 49.686, h = 40.09 },
            storeClose = 20,
            storeOpen = 7,
        },
         -- valentine
        [3] = {
            location = { x = -281.255, y = 780.033, z = 119.553, h = 5.86 }, 
            storeClose = 20,
            storeOpen = 7,
        }, 
         -- rhodes
        [4] = {
            location = { x = 1323.141, y = -1322.304, z = 77.939, h = 343.25 },
            storeClose = 20,
            storeOpen = 7,
        },
        -- tumbleweed
        [5] = {
            location = { x = -5507.428, y = -2964.109, z = -0.578, h = 115.78 },
            storeClose = 20,
            storeOpen = 7,
        }
    },
    -- additional settings
    useStoreHours = false,
}