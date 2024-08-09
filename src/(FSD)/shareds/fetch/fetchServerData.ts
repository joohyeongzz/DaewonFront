interface fetchServerDataType {
    path: string;
}

export const fetchServerData = async ({ path, }: fetchServerDataType) => {
    const response = await fetch(`https://www.awskjh.p-e.kr${path}`);
    
    const data = response.json();

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    };

    return data;
} 