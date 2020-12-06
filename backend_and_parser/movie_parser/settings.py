"""
Django settings for movie_parser project.

Generated by 'django-admin startproject' using Django 2.2.11.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import logging
from os import getenv
from dotenv import load_dotenv

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

logger = logging.getLogger(__name__)

load_dotenv()

_sentry_dsn = getenv("SENTRY_DSN")

if _sentry_dsn is not None:
    sentry_sdk.init(
        dsn=_sentry_dsn,
        integrations=[DjangoIntegration()],
        traces_sample_rate=1.0,

        # If you wish to associate users to errors (assuming you are using
        # django.contrib.auth) you may enable sending PII data.
        send_default_pii=True
    )
    logger.info("sentry_sdk 활성화됨.")
else:
    logger.warning("SENTRY_DSN 설정값이 지정되지 않았으므로 sentry_sdk 오류 로깅을 사용할 수 없습니다!")

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = getenv('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!

_production = 0
if getenv('PRODUCTION') is not None:
    _production += int(getenv('PRODUCTION'))


DEBUG = not bool(_production)
ALLOWED_HOSTS = [getenv("SERVICE_HOST"), "127.0.0.1"]


CORS_ORIGIN_ALLOW_ALL = True


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'myapp'
]

MIDDLEWARE = [
    'myapp.middleware.corsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'corsheaders.middleware.CorsMiddleware'
]

ROOT_URLCONF = 'movie_parser.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'movie_parser.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': getenv('DB_NAME'),
        'USER': getenv('DB_USER'),
        'PASSWORD': getenv('DB_PASSWORD'),
        'HOST': getenv('DB_HOST'),
        'PORT': getenv('DB_PORT', int),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
            # apply mysql.W002 warning hint
        }
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

PRINT_LOG_LEVEL = 'INFO' if getenv('PRINT_LOG_LEVEL') is None else getenv('PRINT_LOG_LEVEL')
SAVE_LOG_LEVEL = 'INFO' if getenv('SAVE_LOG_LEVEL') is None else getenv('SAVE_LOG_LEVEL')

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%Y-%m-%d %H:%M:%S"
        },
    },
    'handlers': {
        'console': {
            'level': PRINT_LOG_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'default'
        },
        'file' : {
            'level' : SAVE_LOG_LEVEL,
            'class' : 'logging.handlers.RotatingFileHandler',
            'filename' : 'django.log',
            'formatter' : 'default',
            # https://jeunjeun.tistory.com/5

        }
    },
    'loggers': {
        # 'django': {
        #     'handlers': ['file'],
        #     'propagate': True,
        #     'level': SAVE_LOG_LEVEL,
        # },
        #
        # 'django.request' : {
        #     'handlers' : ['file'],
        #     'propagate' : True,
        #     'level' : SAVE_LOG_LEVEL
        # },

        'urllib.connectionpool' : {
            'handlers': ['console'],
            'propagate': True,
            'level': 'CRITICAL',
        },

        'myapp' : {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        },
    }
}

REST_FRAMEWORK = {
    # 'DEFAULT_FILTER_BACKENDS' : ('django_filters.rest_framework.DjangoFilterBackend',),
    ## 추가가 필요할 경우 사용합니다.
    ## !! iterable 형태의 데이터여야 합니다!!
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     'rest_framework.permissions.IsAuthenticated'
    # ]
}

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

# LANGUAGE_CODE = 'ko-kr'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Seoul'
USE_I18N = True
USE_L10N = True
USE_TZ = True

## 주의! redirection 되는 시점에서는 middleware가 없음.
APPEND_SLASH = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

## TODO: 서비스를 다른 곳으로 다시 옮기게 되는 경우 환경볂수와 함께 수정 예정
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR + '/' + "static"