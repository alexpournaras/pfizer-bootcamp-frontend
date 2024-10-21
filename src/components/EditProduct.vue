<template>
    <div>
        <h2>Edit Product {{ productId }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
};
</script>