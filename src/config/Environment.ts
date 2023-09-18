export class Environment {
    static SALT_ROUNDS = parseInt(process.env?.SALT_ROUNDS_PASSWORD ?? '14')
}
