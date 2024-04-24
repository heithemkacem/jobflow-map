enum UserJobAdStatus {
	DEFAULT = "DEFAULT",
	BOOKMARKED = "BOOKMARKED",
	IN_CHAT = "IN_CHAT",
	APPLIED = "APPLIED",
	REJECTED = "REJECTED",
	WITHDRAWN = "WITHDRAWN",
}

interface CommonCloudImageRo {
	cloudName: string;
	rawUrl: string;
	width: number | null;
	height: number | null;
	variants: CommonCloudImageVariantsRo;
}

interface CommonCloudImageVariantsRo {
	rawUrl: string;
	min_dim_32_url: string;
	min_dim_64_url: string;
	min_dim_128_url: string;
	min_dim_256_url: string;
	min_dim_512_url: string;
	max_dim_1280_url: string;
	min_dim_1280_url: string;
}

interface CommonCloudVideoVariantsRo {
	max_dim_1920_url: string;
	max_dim_1280_url: string;
	max_dim_512_url: string;
	max_dim_256_url: string;
	min_dim_1920_url: string;
	min_dim_1280_url: string;
	min_dim_512_url: string;
	min_dim_256_url: string;
}

interface CommonCloudVideoRo {
	cloudName: string;
	rawUrl: string;
	width: number | null;
	height: number | null;
	duration: number | null;
	thumbnail: CommonCloudImageVariantsRo;
	variants: CommonCloudVideoVariantsRo;
}

interface JobAdMediaRo {
	videoUrl: string;
	thumbnailUrl: string;
	cloudVidName: string;
	cloudVideo: CommonCloudVideoRo;
}

interface CompanySimpleRo {
	name: string;
	hash: string;
	id: string;
	logoImg: CommonCloudImageRo | null;
	headerImg: CommonCloudImageRo | null;
	description: string | null;
}

export interface JobAdMediumRo {
    id: string;
	externalName: string;
    isScraped: boolean;
	totalLocationCount: number;
	company: CompanySimpleRo;
	media: JobAdMediaRo | null;
	status: UserJobAdStatus;
	savedInfo: {
		millis: number;
	} | null;
}

export interface SearchJobAdRo {
	combinedId: string;
	primaryLocation:  {
        id: string;
	    location: {
            postalCode: number | null;
            cityName: string | null;
            countryName: string | null;
            streetAddress: string | null;
            lat: number;
            lng: number;
            selectedValue: string;
        };
    };
	jobAd: JobAdMediumRo;
}