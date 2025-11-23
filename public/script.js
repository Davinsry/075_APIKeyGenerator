document.addEventListener('DOMContentLoaded', () => {
    
    const generateBtn = document.getElementById('generateBtn');
    const saveBtn = document.getElementById('saveBtn');
    const userForm = document.getElementById('userForm');
    
    const apiKeyInput = document.getElementById('apiKey');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    // API Base URL (Backend kita)
    const API_URL = 'http://localhost:5000';

    // 1. Logika Tombol "Generate API Key"
    generateBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/api/user/generate-key`);
            if (!response.ok) {
                throw new Error('Gagal mengambil API key');
            }
            const data = await response.json();
            apiKeyInput.value = data.apiKey;
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    });

    // 2. Logika Tombol "Save Data" (Submit Form)
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah form reload halaman

        const userData = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            apiKey: apiKeyInput.value
        };

        // Validasi simpel
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.apiKey) {
            alert('Harap lengkapi semua data, termasuk generate API key!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/user/save-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (!response.ok) {
                // Tampilkan error dari server (misal: "Email sudah digunakan")
                throw new Error(result.message || 'Gagal menyimpan data');
            }

            alert('Sukses! Data user dan API key berhasil disimpan.');
            userForm.reset(); // Kosongkan form setelah sukses

        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    });

});