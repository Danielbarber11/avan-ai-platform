const BASE_URL = 'https://api.jsonbin.io/v3/b';

export const getBinId = () => localStorage.getItem('avan_jsonbin_id');
export const setBinId = (id) => localStorage.setItem('avan_jsonbin_id', id);

export const getApiKey = () => localStorage.getItem('avan_jsonbin_key');
export const setApiKey = (key) => localStorage.setItem('avan_jsonbin_key', key);

// Create a new bin if one doesn't exist
const createBin = async (apiKey, data = []) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': apiKey,
                'X-Bin-Name': 'Avan_Gallery_Data'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to create bin');

        const result = await response.json();
        const binId = result.metadata.id;
        setBinId(binId);
        return binId;
    } catch (error) {
        console.error("Error creating bin:", error);
        throw error;
    }
};

export const saveToCloud = async (data) => {
    const apiKey = getApiKey();
    if (!apiKey) return { success: false, error: 'missing_key' };

    let binId = getBinId();

    try {
        // 1. Get current data
        let currentData = [];
        if (binId) {
            try {
                const response = await fetch(`${BASE_URL}/${binId}`, {
                    headers: { 'X-Master-Key': apiKey }
                });
                if (response.ok) {
                    const result = await response.json();
                    currentData = result.record || [];
                } else {
                    // Bin might be deleted or invalid, create new
                    binId = null;
                }
            } catch (e) {
                console.warn("Could not fetch existing bin, creating new one");
            }
        }

        // 2. Append new data
        currentData.unshift({ ...data, timestamp: new Date().toISOString() });

        // 3. Save back (Create or Update)
        if (!binId) {
            await createBin(apiKey, currentData);
        } else {
            await fetch(`${BASE_URL}/${binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify(currentData)
            });
        }

        return { success: true };
    } catch (error) {
        console.error("JSONBin Save Error:", error);
        return { success: false, error: error.message };
    }
};

export const getFromCloud = async () => {
    const apiKey = getApiKey();
    const binId = getBinId();

    if (!apiKey || !binId) return [];

    try {
        const response = await fetch(`${BASE_URL}/${binId}`, {
            headers: { 'X-Master-Key': apiKey }
        });

        if (!response.ok) return [];

        const result = await response.json();
        return Array.isArray(result.record) ? result.record : [];
    } catch (error) {
        console.error("JSONBin Fetch Error:", error);
        return [];
    }
};
