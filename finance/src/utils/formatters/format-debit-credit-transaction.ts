export function formatValueTransaction(value: number, type : string): string {
    if(type === 'debit'){
        return `- R$ ${value.toFixed(2).replace('.', ',')}`;
    }
    return `+ R$ ${value.toFixed(2).replace('.', ',')}`;
}