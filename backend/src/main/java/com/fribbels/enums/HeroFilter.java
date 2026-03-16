package com.fribbels.enums;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;


@Getter
public enum HeroFilter {

    @SerializedName("optimizer") OPTIMIZER,
    @SerializedName("sixstar") SIX_STAR,
    @SerializedName("fivestar") FIVE_STAR,
}
