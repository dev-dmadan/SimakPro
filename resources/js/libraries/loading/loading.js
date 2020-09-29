export class LoadingHelper {
    constructor() {

    }

    static showLoading(isShow = true) {

    }

    static showShimmer(isShow = true) {
        const shimmer = document.querySelectorAll('.shimmer_wrapper');
        const isShimmerExists = shimmer && shimmer.length > 0 ? true : false;

        if(isShimmerExists) {
            const shimmerLength = shimmer.length;
            for (let i = 0; i < shimmerLength; i++) {
                if(isShow) {
                    shimmer[i].classList.remove('d-none');
                    shimmer[i].nextElementSibling.classList.toggle('d-none', true);
                } else {
                    shimmer[i].classList.toggle('d-none');
                    shimmer[i].nextElementSibling.classList.remove('d-none');
                }
            }
        }
    }
}