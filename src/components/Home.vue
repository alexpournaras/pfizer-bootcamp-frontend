<template>
    <div>
        <div class=" banner-section-corporate-hero-parent" bis_skin_checked="1">
            <div class="homepage-banner---hope-changes-lives banner-section-wrapper banner-tile  careers-image tile color-black analytics-container"
                data-title="Homepage Banner - Hope Changes Lives" bis_skin_checked="1">
                <div class="banner-tile__bg" bis_skin_checked="1">
                    <picture>
                        <source media="(min-width: 1920px)"
                            srcset="https://cdn.pfizer.com/pfizercom/styles/convert_to_webp/s3/2021-12/banner_section/Pfizer-Brand-Motif-09%202.jpg.webp?VersionId=tQxjIOImbEdYcTu_u_m6UD0cRx8Eu2F7&amp;itok=2JPgvTtS">
                        <source media="(min-width: 1281px) and (max-width: 1920px)"
                            srcset="https://cdn.pfizer.com/pfizercom/styles/convert_to_webp/s3/2021-12/banner_section/Pfizer-Brand-Motif-09%202.jpg.webp?VersionId=tQxjIOImbEdYcTu_u_m6UD0cRx8Eu2F7&amp;itok=2JPgvTtS">
                        <source media="(min-width: 415px) and (max-width: 1280px)"
                            srcset="https://cdn.pfizer.com/pfizercom/styles/convert_to_webp/s3/2021-12/banner_section/Pfizer-Brand-Motif-09%202.jpg.webp?VersionId=tQxjIOImbEdYcTu_u_m6UD0cRx8Eu2F7&amp;itok=2JPgvTtS">
                        <source media="(max-width: 414px)"
                            srcset="https://cdn.pfizer.com/pfizercom/styles/convert_to_webp/s3/2021-12/banner_section/Pfizer-Brand-Motif-09%202.jpg.webp?VersionId=tQxjIOImbEdYcTu_u_m6UD0cRx8Eu2F7&amp;itok=2JPgvTtS">
                        <img src="https://cdn.pfizer.com/pfizercom/2021-12/banner_section/Pfizer-Brand-Motif-09%202.jpg?VersionId=nkl9Vff2xgScPSri_q.vfus7iiczlIIv"
                            width="100%" height="auto" alt="Hope Changes Lives">
                    </picture>
                </div>
                <div class="grid-container " bis_skin_checked="1">
                    <div class="grid-x grid-padding-x" bis_skin_checked="1">
                        <div class="cell medium-8 medium-offset-2" bis_skin_checked="1">
                            <div class="banner-tile__content" bis_skin_checked="1">
                                <h1 class="banner-tile__headline banner-tile__headline-small"> Hope Changes Lives
                                </h1>
                                <div class="banner-tile__desc" bis_skin_checked="1">
                                    <p>
                                        We’re in relentless pursuit of scientific breakthroughs and revolutionary
                                        medicines that will create a healthier world for everyone.&nbsp;
                                    </p>
                                </div>
                                <div class="banner-tile__cta" bis_skin_checked="1">
                                    <a @click="goToProducts" class="btn btn--primary go-to-products" aria-label="Explore Our Science "
                                        title="Explore Our Science " sc:linkname="button:home:explore our science"
                                        data-pfa-click="" data-di-id="di-id-4bed5d4c-5a86aa35">
                                        Explore Our Products
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToProducts() {
      this.$router.push({
        name: "ListProducts",
      });
    },
    },
};
</script>

<style scoped>
.go-to-products {
    cursor: pointer;
}
</style>
