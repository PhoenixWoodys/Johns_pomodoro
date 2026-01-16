// Netlify Function pour compteur de visites global
// Utilise Netlify Blobs pour le stockage persistant

import { getStore } from "@netlify/blobs";

export default async (request, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers });
    }

    try {
        const store = getStore("visit-counter");

        // Récupérer le compteur actuel
        let count = await store.get("count", { type: "json" });

        if (count === null) {
            count = 0;
        }

        // Incrémenter le compteur
        count++;

        // Sauvegarder le nouveau compteur
        await store.setJSON("count", count);

        return new Response(
            JSON.stringify({ count }),
            { status: 200, headers }
        );
    } catch (error) {
        console.error('Erreur compteur:', error);
        return new Response(
            JSON.stringify({ error: 'Erreur serveur', count: -1 }),
            { status: 500, headers }
        );
    }
};

export const config = {
    path: "/api/visit-counter"
};
