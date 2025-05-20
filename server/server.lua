-- SERVER MODULE
----------------

-- do not touch this code

local securecode = math.random(111111, 9999999)

-- setup

local VORPcore = exports.vorp_core:GetCore()

-- events

RegisterNetEvent('gunCatalogue:Purchase')

AddEventHandler('gunCatalogue:Purchase', function(data, code)
    print("Received purchase:", json.encode(data), code)
	print("[SERVER] Purchase requested", json.encode(data), code)
	local source = source
    -- setup
    local User = VORPcore.getUser(source)

    if User then
        local Character = User.getUsedCharacter

        if code == securecode then
            for k, v in pairs(Config.weapons) do
                if v.weapon == data.weapon then
                    local money = Character.money
                    if data.isammo == 0 then
                        if money >= v.price then
                            local canCarry = exports.vorp_inventory:canCarryWeapons(source, 1, nil, v.weapon)
                            if not canCarry then
                                VORPcore.NotifyRightTip(source, "Can't carry any more weapons!", 3000)
                                return
                            end
                            Character.removeCurrency(0, v.price)
                            local ammo = { ["nothing"] = 0 }
                            local components = { ["nothing"] = 0 }
                            exports.vorp_inventory:createWeapon(source, v.weapon, ammo, components)
                            VORPcore.NotifyRightTip(source, "You have purchased a " .. v.label, 4000)
                            TriggerClientEvent('gunCatalogue:playSoundPurchase', source)
                        else
                            VORPcore.NotifyRightTip(source, "You do not have enough money", 3000)
                        end
                        break
                    elseif data.isammo == 1 then
                        if money >= v.ammoprice then
                            local canCarry = exports.vorp_inventory:canCarryItem(source, v.ammo, 1)
                            if not canCarry then
                                return VORPcore.NotifyRightTip(source, "Can't carry any more items!", 3000)
                            end
                            if v.ammo ~= 'none' then
                                Character.removeCurrency(0, v.ammoprice)
                                exports.vorp_inventory:addItem(source, v.ammo, 1)
                                VORPcore.NotifyRightTip(source, "You have purchased " .. v.ammolabel, 4000)
                                TriggerClientEvent('gunCatalogue:playSoundPurchase', source)
                            else
                                VORPcore.NotifyRightTip(source, "This weapon has no ammo available", 3000)
                            end
                        else
                            VORPcore.NotifyRightTip(source, "You do not have enough money", 3000)
                        end
                        break
                    end
                end
            end
        else
            VORPcore.NotifyRightTip(source, "ERROR: Invalid code", 3000)
        end
    else
        print("ERROR: getUser returned nil for source: " .. tostring(source))
    end
end)

RegisterServerEvent('gunCatalogue:getCode')
AddEventHandler('gunCatalogue:getCode', function()
    local src = source
    TriggerClientEvent('gunCatalogue:receiveCode', src, securecode)
end)




-- helpers

-- Print contents of tbl, with indentation.
-- indent sets the initial level of indentation.
function tprint(tbl, indent)
    if not indent then indent = 0 end
    for k, v in pairs(tbl) do
        formatting = string.rep("  ", indent) .. k .. ": "
        if type(v) == "table" then
            print(formatting)
            tprint(v, indent + 1)
        elseif type(v) == 'boolean' then
            print(formatting .. tostring(v))
        else
            print(formatting .. v)
        end
    end
end
