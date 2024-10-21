<template>
    <div>
        <h2>Show Product {{ productId }}</h2>
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