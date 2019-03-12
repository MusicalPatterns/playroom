import { Metadata } from '@musical-patterns/pattern'

const computePost: (metadata: Metadata) => string =
    (metadata: Metadata): string => {
        let post: string = metadata.description || ''
        if (!post.startsWith('<div class="row">')) {
            post = `<div class="row"><div class="middle"><p>${post}</p></div><div class="right"></div></div>`
        }

        return post
    }

export {
    computePost,
}
