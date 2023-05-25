const baseUrl = 'https://pokeapi.co/api/v2/';

export const obtenerPokemonName = async(name) => {
        try {
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const data = await resp.json();
            return data
        } catch (error) {
            throw error
        }
}

export const obtenerGeneraciones = async(id) => {
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await resp.json();
        return data
    } catch (error) {
        throw error
    }
}

export const obtenerPokemonId = async(id) => {
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await resp.json();
        return data
    } catch (error) {
        throw error
    }
}